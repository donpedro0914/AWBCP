<header id="header-navbar">
	<div class="content-mini content-mini-full content-boxed" style="height:105px;">
		<ul class="nav-header pull-right">
			<li class="header-content">
				<a class="f5" href="/">
					{{ HTML::image('img/avantice-logo.jpg', 'Infinity Logo', array('style' => 'display:block;margin:0 auto;width:300px;')) }}
				</a>
			</li>
		</ul>
	</div>
	@if(\Request::is('/'))
	<div class="content-mini content-mini-full content-boxed">
		<div class="text-center">
			“Welcome to Avantice Web Portal. This portal will guide you to fix your issues on the applications below. If doing the procedures and still not resolved your issue or encountered issue is not on the list, please approach IT thru email(<a href="mailto:helpdesk@caspo.com">helpdesk@caspo.com</a>),Spark or Skype. Thank you.”
		</div>
	</div>
	@endif
</header>