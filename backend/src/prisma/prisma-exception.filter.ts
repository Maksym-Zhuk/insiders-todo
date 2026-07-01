import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { Prisma } from 'src/generated/prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    switch (exception.code) {
      case 'P2002': {
        const target = (exception.meta?.target as string[])?.join(', ');
        return response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          error: 'Conflict',
          message: `A record with this value already exists${target ? `: ${target}` : ''}`,
        });
      }
      case 'P2025': {
        return response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          error: 'Not Found',
          message: (exception.meta?.cause as string) ?? 'Record not found',
        });
      }
      case 'P2003': {
        return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: 'Foreign key constraint violation',
        });
      }
      case 'P2000': {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'The provided value is too long for the column',
        });
      }
      default:
        return super.catch(exception, host);
    }
  }
}
