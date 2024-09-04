# install NATS to current namespace through helm
helm install --set auth.enabled=false my-nats oci://registry-1.docker.io/bitnamicharts/nats

# upgrade NATS to enable metrics
helm upgrade --set metrics.enabled=true,auth.enabled=false my-nats oci://registry-1.docker.io/bitnamicharts/nats

# upgrade NATS with custom values
helm upgrade -f nats-values.yaml my-nats oci://registry-1.docker.io/bitnamicharts/nats