echo "Starting KidsonX Tech's rebel bot Auto-Push Script"
read -p "Press any key to continue ..."
git add .
echo "Finished git add ."
read -p "Confirm Commit..."
echo "What do you want your commit message to be?"
read COMMIT_MSG
git commit -m "$COMMIT_MSG"
echo "\nFinished Commit...\n"
git push heroku master
echo "\nFinished Push to Heroku master branch\n"
git push origin master
echo "\n Finished Push to Github/origin master branch\n"
read -p "Complete. PRESS ENTER TO EXIT"