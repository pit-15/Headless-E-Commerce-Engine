const asyncHandler = (fn)=>
{
    return (req,res,next)=>
    {
        Promise.resolve(fn(req,res,next)).catch(next)
    }
}                                                           
export default asyncHandler;

/*

Route → asyncHandler → Controller → Error thrown
                                     ↓
                                catch(next)
                                     ↓
                             errorHandler middleware
                                     ↓
                               JSON response*/