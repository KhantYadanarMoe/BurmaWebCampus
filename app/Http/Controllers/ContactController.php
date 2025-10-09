<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function store(){
        // validate all the data from frontend
        $validator = Validator::make(request()->all(), [
            "name" => ["required"],
            "email" => ["required"],
            "phone" => ["required"],
            "message" => ["string", "max:1000"],
        ]);

        // condition for failed validation
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->messages()
            ], 422);
        }

        // store the rest of the data
        $contacts = Contact::create([
            'name' => request('name'),
            'email' => request('email'),
            'phone' => request('phone'),
            'message' => request('message'),
        ]);

        // return when the data is successfully created.
        return response()->json([
            'message' => 'Contact Message sent successfully.',
            'contacts' => $contacts,
        ]);
    }

    public function index(){
        $contacts = Contact::latest()->get();

        return response()->json([
            'contacts' => $contacts
        ]);
    }

    public function show($id){
        $contact = Contact::FindOrFail($id); 

        if ($contact) {
            return response()->json(['contact' => $contact]);
        } else {
            return response()->json(['message' => 'Contact not found'], 404);
        }
    }
    
    public function mark(Request $request, $id){
        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json(['message' => 'Contact not found'], 404);
        }

        $contact->marked = $request->marked; 
        $contact->save();

        return response()->json(['message' => 'Contact marked successfully']);
    }

    public function delete(Contact $contact){
        $contact->delete();
        return response()->json([
            'message' => 'Contact deleted successful!'
        ]);
    }
}
