pipeline {
    agent any
    
    stages {
        stage('Publish files to webserver') {
            when {
                branch 'master'
                not {
                    changeRequest()
                }
            }
            agent {
                docker { 
                    image 'srvitsmdrone01.master.dns:5000/alpine-rsync'
                    registryUrl 'http://srvitsmdrone01.master.dns:5000'
                }
            }
            environment {
                SSH_KEY = credentials('JENKINS_SSH_KEY')
            }
            steps {
                sh 'rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i $SSH_KEY" --progress ./ oitc@172.16.101.32:/var/www/openitcockpit_io/api'
            }
        }
    }
    
}
