import { describe, expect, test } from '@jest/globals';
import { createMessage, getAllMessages, getMessagesByConversation } from '../../controllers/messageController';
import Message from '../../models/messageModel';


describe('Message Controller Tests', () => {
  let req;
  let res;

  beforeEach(() => {
    // Simuler les méthodes de res
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('Test fonction createMessage', () => {
    let req;
    let res;

    beforeEach(() => {
        // Simuler les méthodes de res
        res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
        };
    });

    test.skip('Création du message', async () => {
        req = {
            body: {
              codeExpediteur: 1,
              codeDestinataire: 2,
              messageText: 'Bonjour !',
              dateEnvoi: expect.any(String)
            }
          };

          const createMock = jest.fn((message, callback) => {
            callback(null, { id: 1, ...message });
          });
          Message.create = createMock;
      
          await createMessage(req, res);
      
          expect(createMock).toHaveBeenCalledWith({
            codeExpediteur: 1,
            codeDestinataire: 2,
            messageText: 'Bonjour !',
            dateEnvoi: expect.any(String)
          }, expect.any(Function));
      
          expect(res.status).toHaveBeenCalledWith(201);
          expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
    })

    test.skip('Erreur lors de la création du message', async () => {
        req = {
          body: {
            codeExpediteur: 1,
            codeDestinataire: 2,
            messageText: 'Bonjour !'
          }
        };
    
        // Mock the Message.create function to simulate an error
        const createMock = jest.fn((message, callback) => {
          callback(new Error('Erreur BDD'), null);
        });
        Message.create = createMock;
    
        await createMessage(req, res);
    
        expect(createMock).toHaveBeenCalledWith({
          codeExpediteur: 1,
          codeDestinataire: 2,
          messageText: 'Bonjour !',
          dateEnvoi: expect.any(String)
        }, expect.any(Function));
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Erreur BDD' });
      });
  })

  describe('Test de la fonction getAllMessages', () => {
    test.skip('Récupération de messages de l\'utilisateurs', async () => {
        req = {
            params : {
                userId: 1
            }
        };

        const getAllMock = jest.fn((userId, callback) => {
            callback(null, [
              {
                id: 1,
                codeExpediteur: 1,
                codeDestinataire: 2,
                messageText: 'Bonjour !',
                dateEnvoi: new Date().toISOString()
              }
            ]);
          });
          Message.getAll = getAllMock;
      
          await getAllMessages(req, res);
      
          expect(getAllMock).toHaveBeenCalledWith(1, expect.any(Function));
      
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith([
            {
              id: 1,
              codeExpediteur: 1,
              codeDestinataire: 2,
              messageText: 'Bonjour !',
              dateEnvoi: expect.any(String)
            }
          ]);
    })
    test.skip('Test erreur lors de la récupération des messages', async () => {
        req = {
            params : {
                userId: 1
            }
        };

        const getAllMock = jest.fn((userId, callback) => {
            callback(new Error('Erreur lors de la récupération des messages'), null);
          });
          Message.getAll = getAllMock;
      
          await getAllMessages(req, res);

          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ error: 'Erreur lors de la récupération des messages' });
    })
  })

  describe('Test de la fonction getMessagesByConversation', () => {
    let req;
    let res;

    beforeEach(() => {
        // Simuler les méthodes de res
        res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
        };
    });
    test.skip('Récupération des messages de la conversation', async () => {
        req = {
            params: {
                userId: 1,
                annonceId: 1
            }
        }

        const getMessagesByConversationMock = jest.fn((userId, annonceId, callback) => {
            callback(null, [
              {
                id: 1,
                codeExpediteur: 1,
                codeDestinataire: 2,
                messageText: 'Bonjour !',
                dateEnvoi: new Date().toISOString()
              },
              {
                id: 2,
                codeExpediteur: 2,
                codeDestinataire: 1,
                messageText: 'Salut !',
                dateEnvoi: new Date().toISOString()
              },
            ]);
          });


        Message.getByConversation = getMessagesByConversationMock
        await getMessagesByConversation(req, res);

        expect(getMessagesByConversationMock).toHaveBeenCalledWith(1,1, expect.any(Function))
        expect(res.status).toHaveBeenCalledWith(200);

    })
    test.skip('Erreur lors dela récupération des messages de la conversation', async () => {
        req = {
            params: {
                userId: 1,
                annonceId: 1
            }
        }

        const getMessagesByConversationMock = jest.fn((userId, annonceId, callback) => {
            callback(new Error('Erreur lors de la récupération des message de la conversation'), null);
          });


        Message.getByConversation = getMessagesByConversationMock
        await getMessagesByConversation(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Erreur lors de la récupération des message de la conversation' });
    })
  })
});
