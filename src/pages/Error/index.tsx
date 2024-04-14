import { useRouteError } from "react-router-dom"

// your errors will now be handled by this page instead 
//of infinite spinners, unresponsive pages, or blank screens
export const Error = () => {

    // useRouteError provides the error that was thrown. When the user navigates to 
    // routes that don't exist you'll get an error response with a "Not Found" statusText
    const error = useRouteError();
    console.log(error);


    return (
      <div className="h-screen flex justify-center items-center">
        ERROR Screen
        
        </div>
    )
  }
  