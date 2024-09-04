helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add stable https://charts.helm.sh/stable
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# install prometheus
kubectl create namespace prometheus
helm install prometheus-community/kube-prometheus-stack --generate-name --namespace prometheus

# install loki for logging in grafana
kubectl create namespace loki-stack
helm upgrade --install loki --namespace=loki-stack grafana/loki-stack