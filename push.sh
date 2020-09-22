echo "Starting KidsonX Tech's Auto-Push Script"
read -p "Press any key to continue ..."
git add .
echo "Finished git add ."
read -p "Confirm Commit..."
echo "What do you want your commit message to be?"
read COMMIT_MSG
git commit -m "$COMMIT_MSG"
git push heroku master
git push origin master
read -p "Complete. PRESS ENTER TO EXIT"