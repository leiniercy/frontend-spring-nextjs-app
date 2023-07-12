

"use client"

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import {book_image} from '@public/assets/images/book_image.png';

const MyCard = () => {
    const header = (
        <img alt="Card" src={book_image} />
    );
    const footer = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary" />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Card title="Title" subTitle="Subtitle" footer={footer} header={header} className="md:w-25rem" style={{width: '300px'}}>
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
            </Card>
        </div>
    )
}

export default MyCard