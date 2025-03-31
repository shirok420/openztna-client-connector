use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use log::{info, LevelFilter};
use serde::{Deserialize, Serialize};
use std::io;

#[derive(Serialize)]
struct HealthResponse {
    status: String,
    version: String,
    component: String,
}

#[derive(Deserialize)]
struct PolicyRequest {
    user_id: String,
    device_id: String,
    resource_id: String,
}

#[derive(Serialize)]
struct PolicyResponse {
    allowed: bool,
    reason: String,
}

#[get("/")]
async fn index() -> impl Responder {
    HttpResponse::Ok().body("OpenZTNA Control Plane is running")
}

#[get("/health")]
async fn health() -> impl Responder {
    HttpResponse::Ok().json(HealthResponse {
        status: "ok".to_string(),
        version: env!("CARGO_PKG_VERSION").to_string(),
        component: "control-plane".to_string(),
    })
}

#[post("/api/v1/policy/check")]
async fn check_policy(policy_req: web::Json<PolicyRequest>) -> impl Responder {
    // This is a mock implementation for demonstration purposes
    // In a real implementation, this would check against actual policies
    
    info!(
        "Policy check request: user={}, device={}, resource={}",
        policy_req.user_id, policy_req.device_id, policy_req.resource_id
    );
    
    // Always allow for demo purposes
    HttpResponse::Ok().json(PolicyResponse {
        allowed: true,
        reason: "Demo mode: all policies allowed".to_string(),
    })
}

#[actix_web::main]
async fn main() -> io::Result<()> {
    // Initialize logger
    env_logger::builder()
        .filter_level(LevelFilter::Info)
        .init();

    info!("Starting OpenZTNA Control Plane");
    
    // Start HTTP server
    HttpServer::new(|| {
        App::new()
            .service(index)
            .service(health)
            .service(check_policy)
    })
    .bind("127.0.0.1:3000")?
    .run()
    .await
}