# Recuperação de senha 

**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um email com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios de email em ambiente de desenvolvimento
- Utilizar Amazon SES para envios em produção;
- O envio de emails deve acontecer em segundo plano (backgound job);


**RN**

- O link enviado para resetar a senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;


# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu perfil: nome, email e senha;


**RN**

- O usuário não pode alterar seu e-mail pra um e-mail já utilizado;
- Para atualizar sua senha o usuário deve informar a senha antiga;
- Para atualizar sua senha o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF**

- O prestador deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamento do prestador do dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuario deve poder listar todos os prestadores cadastrados;
- O usuario deve poder listar os dias de um mês com pelo menos um horário disponivel do prestador escolhido;
- O usuario deve poder listar os horarios disponiveis em um dia especifico de um prestador;
- O usuario deve poder realizar um novo agendamento com um prestador;


**RNF**

- Armazenar listagem de prestadores em cache;

**RN**

- Cada agendamento deve durar 1h exatamente; 
- Os agendamentos devem estar disponiveis entre as 08:00 às 18:00 (Primeiro às 8h, último as 17h)
- O usuario não pode agendar em um horário já ocupado;
- O usuario não pode agendar em um horário que já passou;
- O usuario não pode agendar serviços consigo mesmo;


