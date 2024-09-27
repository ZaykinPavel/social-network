

// для того, чтобы ответы от сервера с ошибкой действительно выкидывали ошибку
// необходима функция, которая будет валидировать запросы

export async function validateResponse(response: Response): Promise<Response> {
    if (!response.ok) {
        throw new Error(await response.text());
    }
    // если ошибок нет, возвращаем объект ответа без изменений
    return response;
}