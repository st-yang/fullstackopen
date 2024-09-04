# install
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# patch to enable LoadBalancer
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'
# or use port-forward
kubectl port-forward svc/argocd-server -n argocd 8080:443

# get initial password
kubectl get -n argocd secrets argocd-initial-admin-secret -o yaml