import { ApolloLink, Observable } from 'apollo-boost'
import { message } from 'antd'

const mutationResponseLink = new ApolloLink((operation, forward) => {
  return new Observable(observer => {
    let sub

    try {
      sub = forward(operation).subscribe({
        next: result => {
          if (operation.query.definitions.some(def => def?.operation === 'mutation')) {
            for (const typeKey of Object.keys(result.data)) {
              const payload = result.data[typeKey]

              if (payload) {
                const { success, errors, message: msg } = payload

                if (!success) {
                  message.error(`${msg}：${errors.join(', ')}`)
                } else {
                  message.success(msg)
                }
              }
            }
          }

          observer.next(result)
        },
        error: error => {
          console.error(error)
        },
        complete: observer.complete.bind(observer)
      })
    } catch (e) {
      observer.error(e)
    }

    return () => {
      if (sub && sub.unsubscribe) {
        sub.unsubscribe()
      }
    }
  })
})

export default mutationResponseLink
