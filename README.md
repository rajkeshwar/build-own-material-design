## ubuntu has no of files watching issue. Please run this command 
## given below to solve the issue.

echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p