class DetectLocaleError extends Error{
    public input: string;

    constructor(message?: string){
        super(message);
    }
}


export {DetectLocaleError};