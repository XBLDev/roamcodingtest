import { Injectable } from '@nestjs/common';
import { HttpStatus, HttpException } from '@nestjs/common';

@Injectable()
export class AppUtil {
    validateParam(param) {
        if ( !param || param === '' || !param.replace(/\s/g, '').length) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Please provide a valid todo type',
            }, 403);
        }
    }
}
