export function throttle(milissegundos = 500) {

    // target = contexto onde foi chamado o método
    // propertyKey = Parâmetros do método
    // descriptor = método em questão

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const metodoOriginal = descriptor.value;
        let timer = 0;
        descriptor.value = function(...args: any[]) {
            const event = <Event>args[0];
            if (event && event.preventDefault) {
                event.preventDefault();
            }
            
            clearInterval(timer);
            timer = setTimeout(() => metodoOriginal.apply(this, args), milissegundos);
        }

        return descriptor;
    }
}