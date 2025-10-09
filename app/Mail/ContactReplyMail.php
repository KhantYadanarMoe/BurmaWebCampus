<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactReplyMail extends Mailable
{
    use Queueable, SerializesModels;

    public $replyMessage;

    public function __construct($replyMessage)
    {
        $this->replyMessage = $replyMessage;
    }

    public function build()
    {
        return $this->subject('Reply your message from BWC, Burma Web Campus.')
                    ->view('emails.contact_reply')
                    ->with([
                        'messageBody' => $this->replyMessage,
                    ]);
    }
}
