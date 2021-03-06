const mongodb = require('mongodb');
const stream = require('stream');
require('dotenv').config();
const client = new mongodb.MongoClient(process.env.MONGO_URI);
const db = client.db('myFirstDatabase');
const bucket = new mongodb.GridFSBucket(db, { bucketName: 'petImages' });
const model = require('../models/petModel');

(async () => {
    await client.connect();
})();

async function gridAddImg(req, res) {
    const pet = await model.findById(req.params.id);
    const imgId = (mongodb.ObjectId()).toString();
    pet.IMG.push(imgId);
    stream.Readable.from(req.files.img.data).
        pipe(bucket.openUploadStream(imgId, {
            chunkSizeBytes: 10485760
        }))
    await model.findByIdAndUpdate(req.params.id, pet);
    res.redirect(`/adminPet?id=${req.params.id}`);
}

async function petUpload(req, res) {
    const pet = req.body;
    pet.Personality = pet.Personality.split(';');
    pet.Medical = pet.Medical.split(';');
    pet.IMG = [];
    req.files.img.forEach(image => {
        const imgId = (mongodb.ObjectId()).toString();
        pet.IMG.push(imgId);
        stream.Readable.from(image.data).
            pipe(bucket.openUploadStream(imgId, {
                chunkSizeBytes: 10485760
            }))
    })
    await model.create(pet);
    res.redirect('/adminPets');
}

async function petDelete(req, res) {
    try {
        const pet = await model.findById(req.params.id);
        pet.IMG.forEach(async imgName => {
            const imageId = [];
            const image = bucket.find({ filename: imgName });
            await image.forEach(img => imageId.push(img._id));
            await bucket.delete(imageId[0]);
        })
        await model.findByIdAndDelete(req.params.id);
        res.redirect('/adminPets');
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

async function petUpdate(req, res, next) {
    try {
        req.body.data = JSON.parse(req.body.data);
        var pet;
        if (req.body.data.pet) {
            pet = req.body.data.pet;
            pet.Personality = pet.Personality.split(';');
            pet.Medical = pet.Medical.split(';');
        } else {
            pet = await model.findById(req.params.id);
        }
        if (req.body.data.imageName) {
            const imageId = [];
            const image = bucket.find({ filename: req.body.data.imageName });
            await image.forEach(img => imageId.push(img._id));
            await bucket.delete(imageId[0]);
            pet.IMG = pet.IMG.filter(img => img != req.body.data.imageName);
        }
        await model.findByIdAndUpdate(req.params.id, pet);
        res.redirect(`/adminPet?id=${req.params.id}`);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

async function getGridImgs(req, res) {
    try {
        const data = await bucket.find({}).toArray();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

async function getGridImg(req, res) {
    try {
        const data = await bucket.find({ filename: await req.params.id }).toArray();
        if (!data.length) return res.status(404).json({ msg: 'URL path does not exist' });
        await bucket.openDownloadStreamByName(req.params.id).pipe(res);
        res.status(201);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

module.exports = { petUpload, petDelete, petUpdate, gridAddImg, getGridImgs, getGridImg };