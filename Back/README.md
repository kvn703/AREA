# Projet Area - BACK

## Présentation global des technologies

![Screenshot](https://imageupload.io/ib/uApZNL3SxJexJz6_1699195103.png)


Notre projet utilise **PostgreSQL** comme base de données, **Nest.js** pour le backend, **React** avec TypeScript pour l'interface web, et **Flutter** pour l'application mobile. Tout est déployé via **Docker** sur un serveur en ligne pour garantir une performance optimale.


## Ajout d'un service


Dans le répertoire *Back/src* taper les commandes suivantes :

```
nest g ServiceName module
nest g ServiceName controller
nest g ServiceName service
```
### Dans le fichier **ServiceName.controller.ts** :

Ajouter deux routes :

*/api/auth/ServiceName*
Cette route permettra de rediriger la requete de l'utilisateur vers la page de login du service. Il faudra rajouter une variable state à l'url qui contient l'email de l'user, mettre en redirect_uri la route **/api/ServiceName/Callback** et mettre les bons paramètre et bon scope relative au Service.

*/api/ServiceName/Callback* Cette route recevra les informations de connection de l'user au service

#### voici un exemple :

```ts
@Get('auth/ServiceName')
async ServiceNameAuth(@Req() req: any, @Res() res: Response) {
const redirect_url = `${process.env.DNS_NAME}:8080/api/auth/ServiceName/callback`;
res.redirect(
    `https://urlOauthDuService.com/?lesDifferentsParams&redirect_url=${redirect_url}&state=${req.user.email},
);
}

@ApiExcludeEndpoint()
@Get('auth/ServiName/callback')
async ServiceNameAuthCallback(@Req() req: any, @Res() res: Response) {
this.ServiceName.addService(req);
res.redirect(`${process.env.DNS_NAME}:8081/AreaPage`);
}
```

### Dans le fichier **ServiceName.service.ts** :

Vous allez désormais ajouter une method addService dans la classe.

Cette dernière a pour but de parser la réponse reçu par le service, et associé dans la base de donné le service et l'user (avec également le token de l'user sur ce service)

#### voici un exemple simple:
```ts
async addService(req: any) {
    console.log("addService");
    if (req.query.token === undefined)
        return ("error")
    const accessToken = req.query.token;
    const infoUser = await this.getUserInfo(accessToken); ## fonction qui récupère l'utilisateur (plusieurs exemple disponible dans le code)

    if (infoUser === undefined) {
        console.log("Error getting user info");
        return;
    }
    const serviceIdentifier = infoUser.profile.real_name;
    this.saveToken(req.user.email, accessToken, serviceIdentifier, "serviceName");
}

async saveToken(email: string, token: string, serviceIdentifier: string, serviceName: string) {
    const user = await UserEntity.findOne({ where: { email: email } });
    const service = await ServiceEntity.findOne({ where: { name: serviceName } });

    if (user === null || service === null) {
        console.error('User or Service not found (', email, ')');
        return;
    }
    const userService = new UserServiceEntity(), userService.user = user, userService.service = service, userService.token = token, userService.serviceIdentifier = serviceIdentifier;


    try {
        console.log("Saving Slack token ...");
        await userService.save();
    } catch (error) {
        console.error('Error saving token: ', error);
        return;
    }
}
```

Désormais vous avez juste à rajouter des actions et des reactions à votre service.

Vous avez énormément dans d'exemple d'ajouts d'actions et de réactions dans le répertoire *Back/src/UnService/* action ou reaction
