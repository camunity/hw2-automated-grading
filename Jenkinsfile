pipeline {
    agent { docker { 
        image 'node:8.12.0' 
        args '-p 3000:3000'
    } 
    }
    environment {
        HOME = '.'
        SEARCH = '"test": "react-scripts test",'
        REPLACE = '"test": "CI=true react-scripts test --watch=all",'
        PREV = 'learn react'
        SWAP = 'Add a new url'
        COMMITS = 'x'
    }

    stages {
        stage('Build') {
            steps {
                sh 'pwd'
                echo "installing required packages"
                git 'https://github.com/araf-rahman/cmp464_react_Proj2.git'
                sh 'sed -i "s/$SEARCH/$REPLACE/" package.json'
                sh 'sed -i "s/$PREV/$SWAP/" ./src/App.test.js'
                sh 'ls main'
                sh 'ls -a'
		        sh 'cat ./main/App.test.js > ./src/App.test.js'
                sh 'npm ci'
            }

        }
        stage('Test') {
            steps {
                echo "in the test stage"
                sh 'npm test'
                sh 'ls -a'
                script {
                    env.COMMITS = sh(returnStdout: true, script: 'git shortlog')
                    echo "Commits: ${env.COMMITS}"
                } 

                sh(returnStdout: true, script: 'git shortlog > commits').trim()
                echo "$(<commits)"
            }
	    }

    }
}


