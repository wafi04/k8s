export type DeploymentType = {
    name : string
    image : string
    runtime : string
}
export const deployment = ({name,image,runtime} : DeploymentType) => {
    return {

        apiVersion: 'apps/v1',
        kind: 'Deployment',
        metadata: {
            name: name,
        labels: {
            app: name,
            type: 'applications',
        },
    },
      spec: {
        replicas: 1,
        selector: {
            matchLabels: {
                app: name,
            },
        },
        template: {
          metadata: {
            labels: {
                app: name,
            },
            annotations: {
                'app.owner': 'zilog',
                'app.built-by': 'zilog-fe',
            },
        },
          spec: {
            containers: [
                {
                name: name,
                image: image,
                ports: [
                  {
                    containerPort: 8080,
                },
                ],
                env: [
                  {
                    name: 'IMAGE_SOURCE',
                    value: runtime,
                  },
                ],
                // Tidak ada volumeMounts
            },
        ],
        // Tidak ada volumes
    },
},
},
}
}