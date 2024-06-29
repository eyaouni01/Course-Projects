let chai=require("chai");
let chaiHttp=require("chai-http");
const { describe } = require("mocha");
const expect = chai.expect;
const Podcast  = require('../src/database/model/podcast').Podcast;
const request = require('supertest');
let server=require("../api");
//Assertion Style
chai.should();
chai.use(chaiHttp);

describe('Test podcast  api ',()=>{

    //testing the get podcast by id 
    it("it should get the podcast by id ",(done)=>{
        const podcastid=1;
        chai.request(server)
        .get("/podcast/podcast/"+podcastid)
        .end((err,response)=>{
           
            response.body.should.be.a('object');
            response.body.should.have.property("id").eq(1);
           done();
        });
    
    })
          //testing the get podcast by id 
    it("it should display an error message  ",(done)=>{
        const podcastid=200;
        chai.request(server)
        .get("/podcast/podcast/"+podcastid)
        .end((err,response)=>{
            response.should.have.status(500);
            response.text.should.be.eq("Une erreur est survenue lors de la récupération du podcast.");
           done();
        });
    
    })

    //************************* */
    describe('GET /topics/:topic/podcasts', () => {
        it('devrait retourner les 6 derniers podcasts pour le topic spécifié', (done) => {
          const topic = 'Technologie'; // Spécifier le topic pour le test
      
          request(server)
            .get(`/podcast/podcasts/${topic}`)
            .end((err, res) => {
              expect(res.body).to.be.an('array'); // Vérifier que la réponse est un tableau
              expect(res.body.length).to.equal(6); // Vérifier que le tableau contient 6 éléments
              expect(res.body[0]).to.have.property('id'); // Vérifier que chaque élément a une propriété 'id'
              expect(res.body[0]).to.have.property('title'); // Vérifier que chaque élément a une propriété 'title'
              expect(res.body[0]).to.have.property('description'); // Vérifier que chaque élément a une propriété 'description'
              
              done(); // Signaler que le test est terminé
            });
        });
      });
      
    });
    /******************** Testing counting view  */
    describe('Podcast API - Count View', () => {
      let podcast;
    
      beforeEach(async () => {
        // create a test podcast
        podcast = await Podcast.create({
          title: 'Keke Palmer',
          description: 'Keke Palmer has questions for days, about everything under the sun. From the existential to the inconsequential. From pop culture to pop science. From the meaning of life to the meaning of W.A.P. From life in outer space to “Where the eff is Tom from MySpace?“ And everything in between. Because Baby, this is Keke Palmer, and she is here for All. Of. It.',
          author:"'Keke Palmer'",
          topic:"'News & Politics'",
          status:"active",
          imageUrl:"https://evey-podcasts.s3.eu-west-3.amazonaws.com/podcast_images/1678797343479-podcastImage.jpeg",
          views: 71
        });
      });
    
      afterEach(async () => {
        await podcast.destroy();
      });
      describe('POST /podcasts/:id/countview', () => {
        it('should increment the view count of the podcast', async () => {
          const res = await chai.request(server)
            .post(`/podcast/podcasts/${podcast.id}/view`);
    
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equal('View count incremented successfully');
          expect(podcast.views).to.equal(71);
        });
    
        it('should return an error if the podcast is not found', async () => {
          const res = await chai.request(server)
            .post('/podcast/podcasts/999/view');
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message').to.equal('Podcast not found');
        //  expect(podcast.views).to.equal(71);
        });
      });
    });

    describe('getMostViewdPodcaasts', () => {
      it('devrait renvoyer les 5 podcasts les plus vus', (done) => {
        chai.request(server)
          .get('/podcast/most-viewed-podcasts')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array').with.lengthOf(5);
            for (let i = 0; i < res.body.length; i++) {
              res.body[i].should.have.property('title');
              res.body[i].should.have.property('views');
            }
            done();
          });
      });
    });
    