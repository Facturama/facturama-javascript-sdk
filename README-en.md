# Facturama Javascript SDK

>[NOTA] Este documento esta disponible en [Español].
>
>Library to consume the Web API and Multiissuer API of [Facturama](https://api.facturama.mx/).
>
>Check the Facturama guide [here](https://apisandbox.facturama.mx/guias).

## Create user account

> Create a user account in [Sandbox](https://dev.facturama.mx/api/login) environment.
>
> For WEB API, use the RFC  "EKU9003173C9" to make tests, more information [here](https://apisandbox.facturama.mx/guias/perfil-fiscal).
>
> Digital stamp certificates (CSDs), more information [here](https://apisandbox.facturama.mx/guias/conocimientos/sellos-digitales-pruebas). 


## Dependencies

* jQuery http://jquery.com/


## Web API 

> Make CFDIs by using one issuer.
>
> *All operations will be reflected on Facturama's web app.*
## API operations

- Create, get, cancel CFDIs; download XMLs and PDFs and send them by email;
- Check profile and current subscription;
- Logo and digital certificates uploading;
- CRUDs for Product, Customer, Branch office and series.

Some examples: [here](https://github.com/Facturama/facturama-javascript-sdk/wiki/API-Web)



## Mult-issuer API

> Make CFDIs by using multiple issuers.
>
> *These operations will NOT be reflected on Facturama's web app.*

## Mult-issuer API operations

- Create, get, cancel CFDIs; download XMLs and PDFs;
- CRUD for digital sign certificates ("CSD", "Certificados de los Sellos Digitales").

Some examples: [here](https://github.com/Facturama/facturama-javascript-sdk/wiki/API-MultiEmisor)



## I want to contribute!
That is great! Just fork the project in GitHub, create a topic branch, write some code, and add some tests for your new code.

Thanks for helping!

[Español]: ./README.md
