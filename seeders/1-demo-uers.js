'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            {
                phoneNumber: '0938922612',
                password: '$2b$10$asNh1Pj7vcLdnFVZqSOEpu22uLKL9qasCseBIxSpLArMJaRObEsny',
                name: 'Cao Hoai Viet',
                email: 'viet.ch2612@gmail.com',
                avatarUrl: 'https://i.postimg.cc/76vwT6PW/avataaars.png',
                createdAt: new Date(),
                updatedAt: new Date(),
                userType: 'customer',
            },
            {
                phoneNumber: '0938922613',
                password: '$2b$10$asNh1Pj7vcLdnFVZqSOEpu22uLKL9qasCseBIxSpLArMJaRObEsny',
                name: 'Viet Driver 1',
                email: 'viet.ch2613@gmail.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                userType: 'driver',
                avatarUrl: 'https://i.postimg.cc/76vwT6PW/avataaars.png',
                rating: 4,
                status: 1,
                licensePlateNumber: '51G-12345',
            },
            {
                phoneNumber: '0938922614',
                password: '$2b$10$asNh1Pj7vcLdnFVZqSOEpu22uLKL9qasCseBIxSpLArMJaRObEsny',
                name: 'Viet Driver 2',
                email: 'viet.ch2614@gmail.com',
                createdAt: new Date(),
                updatedAt: new Date(),
                userType: 'driver',
                avatarUrl: 'https://i.postimg.cc/76vwT6PW/avataaars.png',
                rating: 4,
                status: 1,
                licensePlateNumber: '51G-12347',
            }
            // Add more user entries as needed
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    }
};