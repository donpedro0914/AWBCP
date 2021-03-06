@extends('layouts.app')

@section('content')
<main id="main-container" style="min-height: 402px;">
	@include('global.header')
	<div class="content">
		<div class="row js-masonry">
			@foreach ($productList as $product)
				<div class="col-md-2 col-xs-12 push-10 js-masonry-sizer">
					<a class="block" href="/product/x/{{ $product->product_name }}">
						<div class="block-content block-content-full">
							@php
							$product_name = str_replace(' ', '_', $product->product_name);
							@endphp
							{{ HTML::image('product/'. $product_name .'/'.$product->product_image, $product->product_name, array('class' => 'img-thumbnail', 'style' => 'width:100%;height:200px;')) }}
							<div class="block-content block-content-full">
								<h2 class="h2 push-10">{{ $product->product_name }}</h2>
							</div>
						</div>
					</a>
				</div>
			@endforeach
		</div>
	</div>
</main>
@endsection