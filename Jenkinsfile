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
            steps {
                sh 'rsync -avz -e "ssh -o StrictHostKeyChecking=no -i /var/lib/jenkins/.ssh/id_rsa" --progress ./ oitc@srvitnweb05.master.dns:/var/www/openitcockpit.io/api'
            }
        }
    }
    
}
