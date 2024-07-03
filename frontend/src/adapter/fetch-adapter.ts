// import { NextApiRequest } from 'next';
// import { getToken } from 'next-auth/jwt';

import { HttpAdapter } from '@/adapter/http-adapter'
import { getServerSession } from 'next-auth';
import { auth } from '@/auth';

// import { authConfig } from '@/auth.config';
// import { NextRequest } from 'next/server';
// import { getAccessToken } from 'next-auth/react';

export class FetchAdapter implements HttpAdapter {
  private url = process.env.BACKEND_API_URL || 'http://localhost:3001/api';
  private headers = {}

  async get(input: string | URL | Request, init?: RequestInit | undefined): Promise<Response> {
    const url = `${this.url}/${input.toString().replace('/', '')}`

    await this.setHeaders()
    return await fetch(url, { headers: this.headers, ...init })
  }

  async post(
    input: string | URL | Request,
    body: Record<string, unknown>,
    init?: RequestInit | undefined,
  ): Promise<Response> {
    const url = `${this.url}/${input.toString().replace('/', '')}`

    await this.setHeaders()

    // console.log('headers', this.headers)
    // console.log('body', body)

    return await fetch(url, {
      method: 'POST',
      headers: this.headers,
      ...init,
      body: JSON.stringify(body),
    })
  }

  async put(
    input: string | URL | Request,
    body: Record<string, unknown>,
    init?: RequestInit | undefined,
  ): Promise<Response> {
    const url = `${this.url}/${input.toString().replace('/', '')}`

    await this.setHeaders()
    return await fetch(url, {
      method: 'PUT',
      headers: this.headers,
      ...init,
      body: JSON.stringify(body),
    })
  }

  async delete(input: string | URL | Request, init?: RequestInit | undefined): Promise<Response> {
    const url = `${this.url}/${input.toString().replace('/', '')}`

    await this.setHeaders()
    return await fetch(url, { method: 'DELETE', headers: this.headers, ...init })
  }

  async setHeaders() {
    this.headers = {
      'Content-Type': 'application/json',
    };

    try {
      const session = await auth(); // getServerSession();
      // console.log('session', session) // TODO: remove

      if (session) {
        this.headers['Authorization'] = `Bearer ${session.accessToken}`;
      }
    } catch (error) {
      console.log('Error getting session:');
      if (error) {
        console.log(error);
      }
    }
    // // console.log('process.env.JWT_PUBLIC_KEY', process.env.JWT_PUBLIC_KEY) // TODO: remove
    
  }
}
