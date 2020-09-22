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
echo ""
git push heroku master
echo ""
echo "Finished Push to Heroku master branch"
echo ""
git push origin master
echo ""
echo "Finished Push to Github/origin master branch"
echo ""
read -p "Complete. PRESS ENTER TO EXIT"