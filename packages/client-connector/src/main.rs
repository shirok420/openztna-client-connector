use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use log::{info, warn, LevelFilter};
use serde::{Deserialize, Serialize};
use std::{io, sync::Arc};
use tokio::sync::RwLock;
use config::{Config, ConfigError, File};
use chrono;
use os_info;
use hostname;

// Configuration structures
#[derive(Debug, Serialize, Deserialize, Clone)]
struct AuthConfig {
    identity_provider: String,
    client_id: String,
    client_secret: String,
    oauth_url: String,
    redirect_uri: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct DeviceAssessmentConfig {
    enabled: bool,
    min_os_version: Option<String>,
    required_security_software: Option<Vec<String>>,
    check_disk_encryption: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct TunnelingConfig {
    protocol: String,
    split_tunneling: bool,
    exclude_domains: Option<Vec<String>>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct GeneralConfig {
    client_id: String,
    control_plane_url: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct AppConfig {
    general: GeneralConfig,
    auth: AuthConfig,
    device_assessment: DeviceAssessmentConfig,
    tunneling: TunnelingConfig,
}

impl AppConfig {
    pub fn new() -> Result<Self, ConfigError> {
        let config = Config::builder()
            // Start with default values
            .set_default("general.client_id", "default-client-id")?
            .set_default("general.control_plane_url", "http://localhost:3000")?
            .set_default("auth.identity_provider", "oidc")?
            .set_default("auth.client_id", "openztna-client")?
            .set_default("auth.client_secret", "")?
            .set_default("auth.oauth_url", "http://localhost:8080/auth")?
            .set_default("auth.redirect_uri", "http://localhost:8085/callback")?
            .set_default("device_assessment.enabled", true)?
            .set_default("device_assessment.check_disk_encryption", true)?
            .set_default("tunneling.protocol", "wireguard")?
            .set_default("tunneling.split_tunneling", true)?
            // Add in config from file
            .add_source(File::with_name("config/client-connector").required(false))
            // Add in settings from environment variables
            .add_source(config::Environment::with_prefix("OPENZTNA"))
            .build()?;

        config.try_deserialize()
    }
}

// Application state
struct AppState {
    config: AppConfig,
    connection_status: RwLock<ConnectionStatus>,
}

#[derive(Debug, Serialize, Clone)]
enum ConnectionStatus {
    Disconnected,
    Connecting,
    Connected,
    Failed(String),
}

// API response types
#[derive(Serialize)]
struct StatusResponse {
    status: String,
    version: String,
    connection_status: String,
    authenticated: bool,
    device_compliant: bool,
}

#[derive(Serialize)]
struct DeviceInfo {
    os_type: String,
    os_version: String,
    hostname: String,
    security_status: DeviceSecurityStatus,
}

#[derive(Serialize)]
struct DeviceSecurityStatus {
    compliant: bool,
    issues: Vec<String>,
    last_assessment: String,
}

#[derive(Serialize)]
struct Application {
    id: String,
    name: String,
    url: String,
    description: String,
}

// API endpoints
#[get("/")]
async fn index() -> impl Responder {
    HttpResponse::Ok().body("OpenZTNA Client Connector is running")
}

#[get("/health")]
async fn health() -> impl Responder {
    HttpResponse::Ok().json(serde_json::json!({
        "status": "ok",
        "version": env!("CARGO_PKG_VERSION"),
        "component": "client-connector"
    }))
}

#[get("/api/v1/status")]
async fn status(data: web::Data<Arc<AppState>>) -> impl Responder {
    let connection_status = data.connection_status.read().await;
    let status_str = match *connection_status {
        ConnectionStatus::Disconnected => "disconnected",
        ConnectionStatus::Connecting => "connecting",
        ConnectionStatus::Connected => "connected",
        ConnectionStatus::Failed(_) => "failed",
    };

    HttpResponse::Ok().json(StatusResponse {
        status: "ok".to_string(),
        version: env!("CARGO_PKG_VERSION").to_string(),
        connection_status: status_str.to_string(),
        authenticated: true, // Placeholder
        device_compliant: true, // Placeholder
    })
}

#[get("/api/v1/device")]
async fn device_info() -> impl Responder {
    // In a real implementation, this would gather actual device information
    let os_info = os_info::get();
    
    HttpResponse::Ok().json(DeviceInfo {
        os_type: format!("{:?}", os_info.os_type()),
        os_version: os_info.version().to_string(),
        hostname: hostname::get()
            .unwrap_or_default()
            .to_string_lossy()
            .to_string(),
        security_status: DeviceSecurityStatus {
            compliant: true,
            issues: vec![],
            last_assessment: chrono::Utc::now().to_rfc3339(),
        },
    })
}

#[get("/api/v1/applications")]
async fn applications() -> impl Responder {
    // In a real implementation, this would fetch applications from the control plane
    let apps = vec![
        Application {
            id: "app1".to_string(),
            name: "Example App 1".to_string(),
            url: "https://app1.example.com".to_string(),
            description: "Example application 1".to_string(),
        },
        Application {
            id: "app2".to_string(),
            name: "Example App 2".to_string(),
            url: "https://app2.example.com".to_string(),
            description: "Example application 2".to_string(),
        },
    ];

    HttpResponse::Ok().json(apps)
}

#[post("/api/v1/connect")]
async fn connect(data: web::Data<Arc<AppState>>) -> impl Responder {
    let mut connection_status = data.connection_status.write().await;
    *connection_status = ConnectionStatus::Connecting;
    
    // In a real implementation, this would establish a connection to the control plane
    // and set up tunneling
    
    // Simulate connection success
    *connection_status = ConnectionStatus::Connected;
    
    HttpResponse::Ok().json(serde_json::json!({
        "status": "connected",
        "message": "Successfully connected to the ZTNA network"
    }))
}

#[post("/api/v1/disconnect")]
async fn disconnect(data: web::Data<Arc<AppState>>) -> impl Responder {
    let mut connection_status = data.connection_status.write().await;
    
    // In a real implementation, this would tear down the connection and tunneling
    
    *connection_status = ConnectionStatus::Disconnected;
    
    HttpResponse::Ok().json(serde_json::json!({
        "status": "disconnected",
        "message": "Successfully disconnected from the ZTNA network"
    }))
}

// Module for device security assessment
mod device_assessment {
    use super::*;
    
    pub async fn assess_device_security(config: &DeviceAssessmentConfig) -> Result<DeviceSecurityStatus, anyhow::Error> {
        // In a real implementation, this would:
        // 1. Check OS version against minimum requirements
        // 2. Verify presence of required security software
        // 3. Check disk encryption status
        // 4. Run custom security checks
        
        let mut issues = Vec::new();
        
        // Example check for OS version
        if let Some(min_version) = &config.min_os_version {
            let os_info = os_info::get();
            if os_info.version().to_string() < *min_version {
                issues.push(format!(
                    "OS version {} is below minimum required version {}",
                    os_info.version(),
                    min_version
                ));
            }
        }
        
        // Example check for disk encryption
        if config.check_disk_encryption.unwrap_or(false) {
            // This would be implemented with platform-specific code
            // For now, we'll just simulate it
            let encryption_enabled = true; // Placeholder
            if !encryption_enabled {
                issues.push("Disk encryption is not enabled".to_string());
            }
        }
        
        Ok(DeviceSecurityStatus {
            compliant: issues.is_empty(),
            issues,
            last_assessment: chrono::Utc::now().to_rfc3339(),
        })
    }
}

// Module for authentication
mod auth {
    use super::*;
    use oauth2::{
        basic::BasicClient, AuthUrl, ClientId, ClientSecret, RedirectUrl, TokenUrl,
    };
    
    pub fn create_oauth_client(config: &AuthConfig) -> Result<BasicClient, anyhow::Error> {
        let client_id = ClientId::new(config.client_id.clone());
        let client_secret = ClientSecret::new(config.client_secret.clone());
        let auth_url = AuthUrl::new(format!("{}/authorize", config.oauth_url))?;
        let token_url = TokenUrl::new(format!("{}/token", config.oauth_url))?;
        let redirect_url = RedirectUrl::new(config.redirect_uri.clone())?;
        
        Ok(BasicClient::new(
            client_id,
            Some(client_secret),
            auth_url,
            Some(token_url),
        )
        .set_redirect_uri(redirect_url))
    }
}

// Module for tunneling
mod tunneling {
    use super::*;
    
    pub async fn establish_tunnel(config: &TunnelingConfig) -> Result<(), anyhow::Error> {
        // In a real implementation, this would:
        // 1. Set up a WireGuard or OpenVPN tunnel
        // 2. Configure routing tables
        // 3. Set up split tunneling if enabled
        
        info!("Establishing tunnel using {} protocol", config.protocol);
        
        // Simulate tunnel setup
        tokio::time::sleep(tokio::time::Duration::from_millis(500)).await;
        
        Ok(())
    }
    
    pub async fn tear_down_tunnel() -> Result<(), anyhow::Error> {
        // In a real implementation, this would:
        // 1. Close the tunnel
        // 2. Restore routing tables
        
        info!("Tearing down tunnel");
        
        // Simulate tunnel teardown
        tokio::time::sleep(tokio::time::Duration::from_millis(200)).await;
        
        Ok(())
    }
}

#[actix_web::main]
async fn main() -> io::Result<()> {
    // Initialize logger
    env_logger::builder()
        .filter_level(LevelFilter::Info)
        .init();

    info!("Starting OpenZTNA Client Connector");
    
    // Load configuration
    let config = match AppConfig::new() {
        Ok(config) => config,
        Err(e) => {
            warn!("Failed to load configuration: {}. Using defaults.", e);
            AppConfig::new().unwrap_or_else(|_| panic!("Failed to create default configuration"))
        }
    };
    
    info!("Configuration loaded");
    
    // Create application state
    let app_state = Arc::new(AppState {
        config,
        connection_status: RwLock::new(ConnectionStatus::Disconnected),
    });
    
    // Start HTTP server
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(app_state.clone()))
            .service(index)
            .service(health)
            .service(status)
            .service(device_info)
            .service(applications)
            .service(connect)
            .service(disconnect)
    })
    .bind("127.0.0.1:3001")?
    .run()
    .await
}