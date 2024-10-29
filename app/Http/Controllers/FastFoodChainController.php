<?php

namespace App\Http\Controllers;

use App\Models\FastFoodChain;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FastFoodChainController extends Controller
{
    public function index(Request $request)
{
    $search = $request->input('search');
    $sortBy = $request->input('sort_by', 'branch_name'); // Default sort by 'branch_name'
    $sortDirection = $request->input('sort_direction', 'asc'); // Default sort direction 'asc'

    $fastFoodChains = FastFoodChain::with('creator') // Load the creator relationship
        ->when($search, function ($query, $search) {
            return $query->where('branch_name', 'like', "%{$search}%")
                         ->orWhere('founder', 'like', "%{$search}%")
                         ->orWhere('location', 'like', "%{$search}%");
        })
        ->when($sortBy, function ($query, $sortBy) use ($sortDirection) {
            // Apply sorting and ensure case-insensitive sorting for branch_name
            if ($sortBy === 'branch_name') {
                return $query->orderByRaw("LOWER(branch_name) {$sortDirection}");
            }
            return $query->orderBy($sortBy, $sortDirection);
        })
        ->paginate(10)
        ->appends(['sort_by' => $sortBy, 'sort_direction' => $sortDirection]);

    return Inertia::render('FastFoodChains/Index', [
        'fastFoodChains' => $fastFoodChains,
        'search' => $search,
        'sort_by' => $sortBy,
        'sort_direction' => $sortDirection,
    ]);
}

    public function create()
    {
        return Inertia::render('FastFoodChains/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'branch_name' => [
                'required',
                'string',
                'max:255',
                function ($attribute, $value, $fail) {
                    if (FastFoodChain::whereRaw('LOWER(branch_name) = ?', [strtolower($value)])->exists()) {
                        $fail('A fast food chain with this branch name already exists. Please use a different name.');
                    }
                }
            ],
            'founder' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'date_founded' => 'required|date|before_or_equal:today', // Ensures date is not in the future
        ], [
            'date_founded.before_or_equal' => 'The founded date cannot be in the future.',
        ]);

        FastFoodChain::create([
            'branch_name' => $request->branch_name,
            'founder' => $request->founder,
            'location' => $request->location,
            'date_founded' => $request->date_founded,
            'created_by' => auth()->id(),
        ]);

        return redirect()->route('fast_food_chains.index')->with('success', 'Fast Food Chain created successfully.');
    }

    public function edit(FastFoodChain $fastFoodChain)
    {
        return Inertia::render('FastFoodChains/Edit', [
            'fastFoodChain' => $fastFoodChain
        ]);
    }

    public function update(Request $request, FastFoodChain $fastFoodChain)
    {
        $request->validate([
            'branch_name' => 'required|string|max:255',
            'founder' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'date_founded' => 'required|date|before_or_equal:today',
        ], [
            'date_founded.before_or_equal' => 'The founded date cannot be in the future.',
        ]);

        $fastFoodChain->update($request->all());
        return redirect()->route('fast_food_chains.index')->with('success', 'Fast Food Chain updated successfully.');
    }

    public function destroy(FastFoodChain $fastFoodChain)
    {
        $fastFoodChain->delete();
        return redirect()->route('fast_food_chains.index')->with('success', 'Fast Food Chain deleted successfully.');
    }
}
