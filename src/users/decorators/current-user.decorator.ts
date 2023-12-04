import { createParamDecorator, ExecutionContext } from '@nestjs/common'

// createParamDecorator is a function that takes a callback function as an argument.
//create a decorator that will be used to get the current user from the request object.
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    return request.currentUser
  },
)

//Al especificar data: never, se está indicando que el parámetro data no se espera que sea utilizado o que tenga algún valor.
//En otras palabras, el decorador CurrentUser está diseñado para no recibir ningún dato adicional cuando se utiliza.
