gcloud container clusters delete dwk-cluster --zone=asia-east2-a

gcloud container clusters create dwk-cluster --zone=asia-east2-a

gcloud container clusters update dwk-cluster --zone=asia-east2-a --enable-autoscaling --min-nodes=1 --max-nodes=5
