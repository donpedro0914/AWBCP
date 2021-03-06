@extends('layouts.app')

@section('content')
<main id="main-container" style="min-height: 402px;">
	@include('global.header')
	<div class="content bg-gray-lighter">
		<div class="row items-push">
			<div class="col-sm-7">
				<h1 class="page-heading">{{ $issue->title }}</h1>
			</div>
			<div class="col-sm-5 text-right hidden-xs">
				<ol class="breadcrumb push-10-t">
					<li>
						<a href="/" class="link-effect">Product List</a>
					</li>
					<li>
						<a href="/product/x/{{ $product->product_name }}" class="link-effect">Issue List</a>
					</li>
					<li>
						{{ $issue->title }}
					</li>
				</ol>
			</div>
		</div>
	</div>
	<div class="content">
		<div class="row">
			<ul style="padding:0;margin:0;">
				@foreach($issue_images as $ii)
					<li style="list-style:none;">{{ HTML::image('product/issues/'. $issue->product_id .'/'.$issue->title.'/'.$ii->images, '', array('class' => 'img-responsive')) }}
				@endforeach
			</ul>
		</div>
	</div>
</main>
@endsection