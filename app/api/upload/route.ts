import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get('file') as File;
  const username = data.get('username') as string;
  const id = data.get('id') as string;

  // Chemin vers le dossier 'uploads'
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  
  // Vérifiez si le répertoire 'uploads' existe, sinon créez-le
  try {
    await fs.access(uploadsDir);
  } catch (error) {
    // Si une erreur se produit, le répertoire n'existe probablement pas, on le crée
    try {
      await fs.mkdir(uploadsDir, { recursive: true });
      console.log('Dossier uploads créé avec succès.');
    } catch (mkdirError) {
      console.error('Erreur lors de la création du dossier uploads:', mkdirError);
      return new Response(JSON.stringify({ message: 'Erreur lors de la création du dossier uploads' }), { status: 500 });
    }
  }

  // Chemin complet pour enregistrer le fichier
  const filePath = path.join(uploadsDir, `user=${username}-id=${id}-file=${file.name}`);

  // Sauvegarde du fichier
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);
    return new Response(JSON.stringify({ message: 'Fichier téléversé avec succès' }), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de l\'écriture du fichier:', error);
    return new Response(JSON.stringify({ message: 'Erreur lors du téléversement du fichier' }), { status: 500 });
  }
}
