import { Injectable } from "@nestjs/common";

@Injectable()
export class S3HelperService{

    

    AWS = require('aws-sdk')
    s3 = new this.AWS.S3({apiVersion: '2006-03-01'});

    
    
    constructor() {
    }

    getImage(id){
    }

    postImage(id){
    }

    removeImage(id){
    }
    
}