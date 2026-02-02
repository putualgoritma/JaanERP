'use server';
import { getServerSession } from "next-auth/next"
import { options } from "@/app/api/auth/[...nextauth]/options"

export async function destroy(path: string, id: number) {
    const session = await getServerSession(options)
    console.log('destroy path.....',process.env.NEXT_PUBLIC_BASE_HOST as string + path + '/' + id)
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_HOST as string + path + '/' + id, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + session.user.token,
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    return data;
                } else {
                    return { total: 0, data: {} }
                }
            });
        let successResponse: any = {
            success: res.success,
            data: res.data,
            message: res.message
        }
        return successResponse;
    } catch (error) {
        console.log('errorr : ', error)
        let errResponse: any = {
            success: false,
            message: "ini error ", error
        }
        return errResponse
    }
}

export async function show(path: string, id: number) {
    const session = await getServerSession(options)
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_HOST as string + path + '/' + id, {
            cache: 'no-store', method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + session.user.token,
                'content-type': 'application/json',
            }
        }).then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    return data;
                } else {
                    return { total: 0, data: {} }
                }
            })
        let successResponse: any = {
            success: res.success,
            data: res.data,
            message: res.message
        }
        return successResponse;
    } catch (error) {
        let errResponse: any = {
            success: false,
            message: "ini error ", error
        }
        return errResponse
    }
}

export async function update(path: string, dataRequest: any) {
    const session = await getServerSession(options)
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_HOST as string + path, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + session.user.token,
            },
            body: JSON.stringify(dataRequest)
        })
            .then((res) => res.json())
            .then((data) => {
                return data;
            });
        let successResponse: any = {
            success: res.success,
            data: res.data,
            message: res.message
        }
        return successResponse;
    } catch (error) {
        //console.log('err update', error)
        let errResponse: any = {
            success: false,
            message: "ini error ", error
        }
        return errResponse
    }
}

export async function patch(path: string, dataRequest: any) {
    const session = await getServerSession(options)
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_HOST as string + path, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + session.user.token,
            },
            body: JSON.stringify(dataRequest)
        })
            .then((res) => res.json())
            .then((data) => {
                return data;
            });
        let successResponse: any = {
            success: res.success,
            data: res.data,
            message: res.message
        }
        return successResponse;
    } catch (error) {
        let errResponse: any = {
            success: false,
            message: "ini error ", error
        }
        return errResponse
    }
}

export async function store(path: string, dataRequest: any) {
    const session = await getServerSession(options)
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_HOST as string + path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + session.user.token,
            },
            body: JSON.stringify(dataRequest)
        })
            .then((res) => res.json())
            .then((data) => {
                return data;
            });
        let successResponse: any = {
            success: res.success,
            data: res.data,
            message: res.message
        }
        return successResponse;
    } catch (error) {
        let errResponse: any = {
            success: false,
            message: "ini error ", error
        }
        return errResponse
    }
}

export async function list(path: string, qry: string) {
    const session = await getServerSession(options)
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_HOST as string + path + qry, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + session.user.token,
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    return data;
                } else {
                    return { data: { total: 0, data: {} } }
                }
            });
        let successResponse: any = {
            success: res.success,
            data: res.data,
            message: res.message
        }
        return successResponse;
    } catch (error) {
        //console.error(error)
        let errResponse: any = {
            success: false,
            message: "ini error ", error
        }
        return errResponse
    }
}