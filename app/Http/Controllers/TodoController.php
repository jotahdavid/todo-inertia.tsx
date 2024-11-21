<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TodoController extends Controller
{
    public function index(): Response
    {
        $todos = Todo::all();

        return Inertia::render('Home', [
            'todos' => $todos,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'min:3', 'max:255'],
        ]);

        Todo::create([
            'title' => $validated['title'],
            'is_completed' => false,
        ]);

        return to_route('todo.index');
    }

    public function updateComplete(Request $request, Todo $todo): RedirectResponse
    {
        $validated = $request->validate([
            'is_completed' => ['required', 'boolean'],
        ]);

        $todo->update([
            'is_completed' => $validated['is_completed'],
        ]);

        return to_route('todo.index');
    }
}
