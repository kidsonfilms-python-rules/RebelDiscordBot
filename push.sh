echo "Starting KidsonX Tech's rebel bot Auto-Push Script"
echo ""
read -p "Press any key to continue ..."
git add .
echo ""
echo "Finished git add ."
echo ""
read -p "Confirm Commit..."
echo ""
echo "What do you want your commit message to be?"
read COMMIT_MSG
git commit -m "$COMMIT_MSG"
echo ""
echo "Finished Commit..."
echo "Pushing to Github and Heroku..."
git push heroku master
git push origin master