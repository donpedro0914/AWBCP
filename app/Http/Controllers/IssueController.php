<?php

namespace App\Http\Controllers;

use App\Issue;
use App\Issue_Images;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use App\Product;
use File;
use DataTables;
use Auth;
use DB;

class IssueController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function issue_list($id) {
        $issue = Issue::where('product_id', $id);

        return DataTables::eloquent($issue)->make(true);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $product_id = $request->input('product_id');
        $title = $request->input('title');

        $issue = Issue::create([
            'product_id' => $product_id,
            'title' => $request->input('title')
        ]);

        if($request->hasFile('issue_image')) {
            $path = public_path().'/product/issues/'.$product_id.'/'.$title.'/';
            if(!File::exists($path)) {
            File::makeDirectory($path, $mode = 0777, true, true);
            }
            foreach($request->file('issue_image') as $im) {
                $filename = $im->getClientOriginalName();
                $im->move($path, $filename);
                $im = $filename;

                Issue_Images::create([
                    'issue_id' => $issue->id,
                    'images' => $im
                ]);
            }
        } else {
            $im = "";
        }

        return redirect('product/info/'.$product_id);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function show(Issue $issue)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function edit(Issue $issue, $id)
    {
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Issue $issue)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function destroy(Issue $issue)
    {
        //
    }

    public function delete($id)
    {

        $title = Issue::where('id', $id)->first();

        $filename = public_path().'/product/issues/'.$title->product_id.'/'.$title->title;

        // dd($filename);

        File::delete($filename);

        $issue = Issue::find($id)->delete();

        Issue_Images::where('issue_id', $id)->delete();

        return response()->json($issue);

    }
}
