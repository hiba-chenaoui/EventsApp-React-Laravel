<?php

// database/migrations/xxxx_xx_xx_xxxxxx_create_events_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->date('date');
            $table->time('time');
            $table->string('location');
            $table->enum('status', ['Approved', 'Pending', 'Rejected'])->default('Pending');
            $table->foreignId('organizer_id')->constrained('users'); // Foreign key for organizer
            $table->foreignId('category_id')->constrained('categories'); // Foreign key for category
            $table->string('image')->nullable(); // Image column
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('events');
    }
}
