/*
 * Function getbyid()
 *
 * Shorthand function for document.getElementById()
 *
 * @param (String) id	ID of the element
 *
 * @return (Mixed (DOM object|Boolean))
 */
function getbyid( id )
{
	return document.getElementById( id );
}


/*
 * Function add_event()
 *
 * Adds an eventhandler/listener to an object
 *
 * @param (Object) 		obj 		Object that we want to bind the event
 * @param (String) 		type 		What kind of event
 * @param (Function) 	event 		Function to be called on event
 * @param (Boolean) 	usecapture	Wheter to capture the event in bubbling
 *
 * @return (boolena) false
 */ 
function add_event( obj, type, event, usecapture )
{
	usecapture = ( usecapture ? usecapture : false );
	
	if( obj.addEventListener )
	{
		obj.addEventListener( type , event , usecapture);
	}
	else
	{
		obj.attachEvent('on'+type, event );
	}

	return false;
}