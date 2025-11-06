# Objetivo:

- O seguinte projeto tem como objetivo de atuar como o back-end para uma rede social fictícia de nome Delta.

# Estruturas:

- A estrutura se trata de como os dados devem ser enviados os JSON para cada rota da aplicação.

## Usuário

```json
{
    login: string;
    senha: string;
    cargo: string;
    nome_usuario: string;
}
```

## Topico

```json
{
    id_topico: number;
    nome_topico: string;
}
```

## Mensagem

```json
{
    id_mensagem: number;
    conteudo: string;
    data_envio: string;
    vizualidada: boolean;
    receptor: string;
    emissor: string;
}
```

## Comunidade

```json
{
    id_comunidade: number;
    nome_comunidade: string;
}
```

## Amizade

```json
{
    login_usuario: string;
    login_amigo: string;
    status: string;
}
```

## Login

```json
{
    login: string,
    senha: string
}
```

## Admin Comunidade

```json
{
    id_comunidade: number;
    login: string;
}
```

# Rotas:

- As seguintes rotas devem ser acessadas seguindo a seguinte tipo-da-rota/nome-da-rota/paramêtro(Caso haja)

## Usuário

```json
usuario.get("/get_all", ControllerUsuarios.get_all_usuarios); (recebe nada)
usuario.get("/get_by_login/:login", ControllerUsuarios.get_usuario_by_login); (recebe apenas o login do usuário)
usuario.post("/create", ControllerUsuarios.create_usuario); (recebe um objeto json com a estrutura do usuário)
usuario.put("/update/:login", ControllerUsuarios.update_usuario_by_login); (Recebe login do usuário como parâmetro junto com nome e senha no body)
usuario.delete("/delete/:login", ControllerUsuarios.delete_usuario_by_login); (recebe o login do usuário commo parâmetro)
```

## Topico

```json
topico.get("/get_all", ControllerTopicos.get_all_topicos); (Recebe nada)
topico.get("/get_by_id/:id", ControllerTopicos.get_topico_by_id); (Recebe o id do tópico como parâmetro)
topico.post("/create", ControllerTopicos.create_topico);(Recebe um json seguindo a estrutura do tópico acima)
topico.put("/update_by_id/:id", ControllerTopicos.update_topico_by_id); (recebe o id do tópico como parâmetro e recebe um body em formato json)
topico.delete("/delete/:id", ControllerTopicos.delete_topico_by_id); (Recebe o id do tópico como parâmetro pra sua remoção)
```

## Mensagem

```json
mensagem.get("/get_all", ControllerMensagens.get_all_mensagens); (recebe nada )
mensagem.get("/get_by_id/:id", ControllerMensagens.get_mensagem_by_id); (recebe o id da mensagem como parâmetro)
mensagem.get("/get_user_messages", ControllerMensagens.get_two_users_messages); (recebe o login do emissor da mensagem e do receptor no body da requisição)
mensagem.post("/create", ControllerMensagens.create_mensagem); (recebe a estrutura de uma mensagem referênciada acima)
mensagem.put("/update/:id", ControllerMensagens.update_mensagem_by_id); (recebe o id da mensagem com parâmetros junto com um corpo seguindo a estrutura de uma mensagem mostrada acima)
mensagem.delete("/delete/:id", ControllerMensagens.delete_mensagem_by_id); (recebe apenas o id da mensagem como parâmetro)
```

## Comunidade

```json
comunidade.get("/get_all", ControllerComunidades.get_all_comunidades); (recebe nada)
comunidade.get("/get_by_id/:id", ControllerComunidades.get_comunidade_by_id); (recebe o id da comunidade)
comunidade.post("/create", ControllerComunidades.create_comunidade); (recebe o body seguindo a estrutura de comunidade referênciada acima)
comunidade.put("/update/:id", ControllerComunidades.update_comunidade_by_id); (recebe o id como parâmetro junto com a estrutura mostrada acima no body)
comunidade.delete("/delete/:id", ControllerComunidades.delete_comunidade_by_id); (recebe o id da comunidade)
```

## Amizade

```json
amizade.get("/get_all_user_amizades", ControllerAmizades.get_all_user_amizades); (recebe login_amigo e login_usuario)
amizade.post("/ask_amizade", ControllerAmizades.ask_amizades); (recebe login_usuario)
amizade.put("/confirm_amizade", ControllerAmizades.confirm_amizade); (recebe login_amigo e login_usuario)
amizade.get("/delete_amizade", ControllerAmizades.delete_amizade_by_id); (recebe login_amigo e login_usuario)
```

## Login

```json
auth.post("/login", ControllerAuth.login); (recebe um body com id e senha)
```

## Admin Comunidade

```json
admin_comunidade.get(
"/get_all",
ControllerAdminComunidade.get_all_admins_comunidades,
); (recebe nada)
admin_comunidade.get(
"/get_by_id/:id",
ControllerAdminComunidade.get_admin_comunidade,
); (recebe id_comunidade e login)
admin_comunidade.post(
"/create",
ControllerAdminComunidade.create_admin_comunidade,
); (recebe id_comunidade e login)
admin_comunidade.delete(
"/delete/:id",
ControllerAdminComunidade.delete_admin_comunidade_by_id,
); (recebe id_comunidade e login)

```
