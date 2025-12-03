<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\EmailSetting;

class ContactReplyMail extends Mailable
{
    use Queueable, SerializesModels;

    public $replyMessage;
    public $senderName;
    public $adminEmail;

    /**
     * Create a new message instance.
     */
    public function __construct($replyMessage)
    {
        $this->replyMessage = $replyMessage;

        // Fetch sender_name and admin_email from settings
        $setting = EmailSetting::first();
        $this->senderName = $setting->sender_name ?? 'Burma Web Campus';
        $this->adminEmail = $setting->admin_email ?? 'no-reply@example.com';
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->from($this->adminEmail, $this->senderName)
                    ->subject('Reply to your message from ' . $this->senderName)
                    ->view('emails.contact_reply')
                    ->with([
                        'messageBody' => $this->replyMessage,
                        'senderName' => $this->senderName,
                        'adminEmail' => $this->adminEmail,
                    ]);
    }
}
