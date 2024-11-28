I couldn't run the build for the app even though I tried uninstalling Node.js and installing it again. I also tried some solutions that I found online, and I even tried creating the project from scratch.
But finally, I couldn't create the build folder for the React project.
So, I failed in the process of deploying the app, and for that reason, I cannot really provide an explanation of how to run the app for someone who doesn't know anything about system engineering or programming.
Because running this project without deploying it involves using commands in the terminal for installing dependencies and navigating through folders in the terminal.
It may even require configuring the virtual environment depending on the IDE used for running the project.

So here's an explanation of how to run the app for someone that knows a little bit about system engineering.
I am going to explain the process using pycharm ide but the process is very similar using another ide.
First of all you have to install Python and Node.js which you can download for free online by following a tutorial or the official documentation for each.
Then pycharm ide as well as most of the ides has the option to clone the repository.
In this case you go to the VCS option and then click on Get from Version Control... and you paste the link from this project in the url option. 
Which is the following https://github.com/simonhangarita/factored_project. And then you clone the project.
Once you cloned the project you go to the terminal inside the ide, create a new tab (with the symbol of "+") inside the terminal and write the following 
command: cd ./backend/app
And after that you execute the following command:pip install -r requirements.txt
On the project view go to the folder backend then go to the folder app and in the main.py file exucute the run symbol on the line 77 which is if __name__=="__main__":
And click on Run 'main'.
Then you go again to the terminal and create a new tab. Write the following command: cd ./frontend/app/vite-project 
After that you write the following command: npm i
Followed by the command: npm i @emotion/react @emotion/styled
Then you execute the following command: npm run dev
and after that you write the letter "o" inside the console and now you are running the application.






