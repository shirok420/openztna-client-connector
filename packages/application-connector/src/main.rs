use hyper::{
    service::{make_service_fn, service_fn},
    Body, Request, Response, Server, StatusCode,
};
use log::{info, LevelFilter};
use std::{convert::Infallible, net::SocketAddr};

async fn handle_request(
    req: Request<Body>,
) -> Result<Response<Body>, Infallible> {
    info!("Received request: {} {}", req.method(), req.uri());

    // For demo purposes, we'll just return a simple response
    // In a real implementation, this would verify access and forward to the protected application
    if req.uri().path() == "/health" {
        let response = serde_json::json!({
            "status": "ok",
            "version": env!("CARGO_PKG_VERSION"),
            "component": "application-connector"
        });
        
        let body = Body::from(serde_json::to_string(&response).unwrap());
        return Ok(Response::builder()
            .status(StatusCode::OK)
            .header("Content-Type", "application/json")
            .body(body)
            .unwrap());
    }
    
    if req.uri().path() == "/" {
        return Ok(Response::builder()
            .status(StatusCode::OK)
            .body(Body::from("OpenZTNA Application Connector is running"))
            .unwrap());
    }
    
    // For demo purposes, we'll return a mock response for all other requests
    // In a real implementation, this would proxy to the actual application after checking policies
    let mock_response = format!(
        "This is a mock response from the Application Connector for: {} {}",
        req.method(),
        req.uri()
    );
    
    Ok(Response::builder()
        .status(StatusCode::OK)
        .body(Body::from(mock_response))
        .unwrap())
}

#[tokio::main]
async fn main() {
    // Initialize logger
    env_logger::builder()
        .filter_level(LevelFilter::Info)
        .init();

    info!("Starting OpenZTNA Application Connector");
    
    // Configure the server
    let addr = SocketAddr::from(([127, 0, 0, 1], 3002));
    
    // Create a service
    let make_svc = make_service_fn(|_conn| async {
        Ok::<_, Infallible>(service_fn(handle_request))
    });
    
    // Start the server
    let server = Server::bind(&addr).serve(make_svc);
    
    info!("Listening on http://{}", addr);
    
    if let Err(e) = server.await {
        eprintln!("Server error: {}", e);
    }
}