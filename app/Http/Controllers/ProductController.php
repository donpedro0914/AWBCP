<?php

namespace App\Http\Controllers;

use App\Product;
use App\Issue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use File;
use DataTables;
use Auth;
use DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function addproduct()
    {
        return view('admin.addproduct');
    }

    public function addissue($id) {
        $productInfo = Product::where('id', $id)->first();

        return view('admin.addissue', compact('productInfo'));
    }

    public function product_list(Request $request) {
        $product = Product::select('*');

        return DataTables::eloquent($product)->make(true);
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
        $product_name = $request->input('product_name');
        $product_name = str_replace(' ', '_', $product_name);

        if($request->hasFile('product_image')) {
            $path = public_path().'/product/'.$product_name.'/';

            if(!File::exists($path)) {
            File::makeDirectory($path, $mode = 0777, true, true);
        }
            $product_img = $request->file('product_image');
            $filename = $product_img->getClientOriginalName();
            $product_img->move($path, $filename);
            $product_img = $filename;
        } else {
            $product_img = "";
        }

        Product::create([
            'product_name' => $request->input('product_name'),
            'product_image' => $product_img,
        ]);

        return redirect('/dashboard');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $productInfo = Product::where('id', $id)->first();

        return view('admin.productinfo', compact('productInfo'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */

    public function delete($id)
    {
        $product = Product::find($id)->delete();

        return response()->json($product);

    }

    public function destroy(Product $product)
    {
        //
    }
}
