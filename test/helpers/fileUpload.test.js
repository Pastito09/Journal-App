import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'difyxejke',
    api_key: '727899222129257',
    api_secret: 'iyCESs-Z5ntCcO57kT3FRKNn8ME',
    secure: true,
});

describe('Pruebas en fileUpload', () => { 
    
    test('debe de subir el archivo correctamente a cloudinary', async() => { 
     
        const imageUrl = 'https://www.shutterstock.com/image-photo/hand-touching-virtual-world-connection-260nw-1750972730.jpg';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([ blob ], 'foto.jpg');

        const url = await fileUpload( file );
        expect( typeof url ).toBe( 'string' );

        //console.log( url );
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '');
        
        const cloudResp = await cloudinary.api.delete_resources(['journal/' + imageId ], {
            resource_type: 'image'
        });
        //console.log( cloudResp );

     });

     test('debe de retornar null', async() => { 
        
        const file = new File([], 'foto.jpg');

        const url = await fileUpload( file );
        expect( url ).toBe( null );

      });

 });