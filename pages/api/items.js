// import { connectToDatabase, ObjectId } from '../../lib/mongodb';

// export default async function handler(req, res) {
//   const { db } = await connectToDatabase();

//   switch (req.method) {
//     case 'GET':
//       try {
//         const items = await db.collection('items').find({}).toArray();
//         res.status(200).json(items);
//       } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch items' });
//       }
//       break;

//     case 'POST':
//       try {
//         const newItem = req.body;
//         if (!newItem || !newItem.name) {
//           return res.status(400).json({ error: 'Invalid input' });
//         }
//         const result = await db.collection('items').insertOne(newItem);
//         res.status(201).json(result.ops[0]);
//       } catch (error) {
//         console.error('Failed to create item:', error);
//         res.status(500).json({ error: 'Failed to create item' });
//       }
//       break;

//     case 'PUT':
//       try {
//         const { _id, ...updates } = req.body;
//         if (!_id || !updates) {
//           return res.status(400).json({ error: 'Invalid input' });
//         }
//         const result = await db.collection('items').updateOne({ _id: new ObjectId(_id) }, { $set: updates });
//         res.status(200).json(result.modifiedCount > 0 ? { _id, ...updates } : { error: 'Failed to update item' });
//       } catch (error) {
//         console.error('Failed to update item:', error);
//         res.status(500).json({ error: 'Failed to update item' });
//       }
//       break;

//     case 'DELETE':
//       try {
//         const { _id } = req.body;
//         if (!_id) {
//           return res.status(400).json({ error: 'Invalid input' });
//         }
//         const result = await db.collection('items').deleteOne({ _id: new ObjectId(_id) });
//         res.status(200).json(result.deletedCount > 0 ? { message: 'Item deleted' } : { error: 'Failed to delete item' });
//       } catch (error) {
//         console.error('Failed to delete item:', error);
//         res.status(500).json({ error: 'Failed to delete item' });
//       }
//       break;

//     default:
//       res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
