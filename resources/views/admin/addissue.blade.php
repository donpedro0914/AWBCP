@extends('layouts.app')

@section('content')
<main id="main-container" style="min-height: 402px;">
	@include('admin.header')
	<div class="content content-boxed">
		<div clas="row">
			<div class="col-lg-12">
				<div class="block">
					<div class="block-content block-content-full" style="overflow: auto;">
						<div class="col-md-12">
							<h3 class="block-title">Add Issue</h3>
							<form method="post" class="form-horizontal" action="{{  URL::to('issue/store') }}" enctype="multipart/form-data">
								<input type="hidden" name="product_id" value="@php echo $productInfo['id'] @endphp">
								{{csrf_field()}}
								<div class="col-md-12">
									<div class="form-group">
										<div class="col-sm-8 col-sm-offset-2">
											<label>Issue</label>
											<input class="form-control" type="text" name="title">
										</div>
									</div>
									<div class="form-group">
										<div class="col-sm-8 col-sm-offset-2">
											<label>Images</label>
											<input class="form-control" type="file" name="issue_image[]" multiple>
										</div>
									</div>
									<div class="form-group">
							        	<div class="pull-right">
							        		<input type="submit" class="btn btn-infinity" value="Submit" />
							        	</div>
							        </div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
@endsection