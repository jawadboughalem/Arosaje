import db from './database';

// Insert operations
export const insertUser = (user) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO utilisateurs (nom, prenom, email, password, photo, botaniste, numero, adresse) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [user.nom, user.prenom, user.email, user.password, user.photo, user.botaniste, user.numero, user.adresse],
      (tx, results) => {
        console.log('Data inserted into utilisateurs table', results.rowsAffected);
      },
      (error) => {
        console.error('Error inserting data into utilisateurs table:', error);
      }
    );
  });
};

export const insertPhoto = (photo) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO photos (datePhotos, CheminAcces, IdUtilisateurs, IdPlantes) 
       VALUES (?, ?, ?, ?)`,
      [photo.datePhotos, photo.CheminAcces, photo.IdUtilisateurs, photo.IdPlantes],
      (tx, results) => {
        console.log('Data inserted into photos table', results.rowsAffected);
      },
      (error) => {
        console.error('Error inserting data into photos table:', error);
      }
    );
  });
};

export const insertMessage = (message) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO Messages (IdUtilisateurs, Message, DateEnvoi) 
       VALUES (?, ?, ?)`,
      [message.IdUtilisateurs, message.Message, message.DateEnvoi],
      (tx, results) => {
        console.log('Data inserted into Messages table', results.rowsAffected);
      },
      (error) => {
        console.error('Error inserting data into Messages table:', error);
      }
    );
  });
};

export const insertPostes = (post) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO Postes (IdUtilisateurs, titre, Description, DatePoste, Localisation) 
       VALUES (?, ?, ?, ?, ?)`,
      [post.IdUtilisateurs, post.titre, post.Description, post.DatePoste, post.Localisation],
      (tx, results) => {
        console.log('Data inserted into Postes table', results.rowsAffected);
      },
      (error) => {
        console.error('Error inserting data into Postes table:', error);
      }
    );
  });
};

export const insertComment = (comment) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO commentaires (IdUtilisateurs, idPlantes, texte, DateCommentaire) 
       VALUES (?, ?, ?, ?)`,
      [comment.IdUtilisateurs, comment.idPlantes, comment.texte, comment.DateCommentaire],
      (tx, results) => {
        console.log('Data inserted into commentaires table', results.rowsAffected);
      },
      (error) => {
        console.error('Error inserting data into commentaires table:', error);
      }
    );
  });
};

export const insertPlantes = (plant) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO Plantes (IdUtilisateurs, NomPlante, PhotoPlante, Description) 
       VALUES (?, ?, ?, ?)`,
      [plant.IdUtilisateurs, plant.NomPlante, plant.PhotoPlante, plant.Description],
      (tx, results) => {
        console.log('Data inserted into Plantes table', results.rowsAffected);
      },
      (error) => {
        console.error('Error inserting data into Plantes table:', error);
      }
    );
  });
};

export const insertGarde = (garde) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO Garde (idUtilisateurs, IdPlantes, DateDebut, DateFin, localisation) 
       VALUES (?, ?, ?, ?, ?)`,
      [garde.idUtilisateurs, garde.IdPlantes, garde.DateDebut, garde.DateFin, garde.localisation],
      (tx, results) => {
        console.log('Data inserted into Garde table', results.rowsAffected);
      },
      (error) => {
        console.error('Error inserting data into Garde table:', error);
      }
    );
  });
};

// Fetch operations
export const getUsers = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM utilisateurs',
      [],
      (tx, results) => {
        let users = [];
        const rows = results.rows;
        for (let i = 0; i < rows.length; i++) {
          users.push(rows.item(i));
        }
        callback(users);
      },
      (error) => {
        console.error('Error querying utilisateurs table:', error);
      }
    );
  });
};

export const getPhotos = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM photos',
      [],
      (tx, results) => {
        let photos = [];
        const rows = results.rows;
        for (let i = 0; i < rows.length; i++) {
          photos.push(rows.item(i));
        }
        callback(photos);
      },
      (error) => {
        console.error('Error querying photos table:', error);
      }
    );
  });
};

export const getMessages = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM Messages',
      [],
      (tx, results) => {
        let messages = [];
        const rows = results.rows;
        for (let i = 0; i < rows.length; i++) {
          messages.push(rows.item(i));
        }
        callback(messages);
      },
      (error) => {
        console.error('Error querying Messages table:', error);
      }
    );
  });
};

export const getPosts = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM Postes',
      [],
      (tx, results) => {
        let posts = [];
        const rows = results.rows;
        for (let i = 0; i < rows.length; i++) {
          posts.push(rows.item(i));
        }
        callback(posts);
      },
      (error) => {
        console.error('Error querying Postes table:', error);
      }
    );
  });
};

export const getComments = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM commentaires',
      [],
      (tx, results) => {
        let comments = [];
        const rows = results.rows;
        for (let i = 0; i < rows.length; i++) {
          comments.push(rows.item(i));
        }
        callback(comments);
      },
      (error) => {
        console.error('Error querying commentaires table:', error);
      }
    );
  });
};

export const getPlants = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM Plantes',
      [],
      (tx, results) => {
        let plants = [];
        const rows = results.rows;
        for (let i = 0; i < rows.length; i++) {
          plants.push(rows.item(i));
        }
        callback(plants);
      },
      (error) => {
        console.error('Error querying Plantes table:', error);
      }
    );
  });
};

export const getGardes = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM Garde',
      [],
      (tx, results) => {
        let gardes = [];
        const rows = results.rows;
        for (let i = 0; i < rows.length; i++) {
          gardes.push(rows.item(i));
        }
        callback(gardes);
      },
      (error) => {
        console.error('Error querying Garde table:', error);
      }
    );
  });
};
